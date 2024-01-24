/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument */

import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import clsx from 'clsx'

/**
 * The root component of the WYSIWYG editor.
 */
const Root = styled('div')({
  '& .rdw-dropdown-selectedtext': {
    color: 'inherit',
  },
  '& .rdw-editor-toolbar': {
    borderWidth: '0 0 1px 0!important',
    margin: '0!important',
  },
  '& .rdw-editor-main': {
    padding: '8px 12px',
    height: `${256}px!important`,
  },
})

/* The props for the WYSIWYG editor component.
 */
type WYSIWYGEditorComponentProps = {
  className?: string
  value?: string
  onChange: (T: string) => void
}

/**
 * The WYSIWYG editor component.
 */
function WYSIWYGEditorComponent(
  props: WYSIWYGEditorComponentProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { onChange, className = '', value = '' } = props
  const blocksFromHtml = htmlToDraft(value)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap,
  )

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState),
  )

  /**
   * The function to call when the editor state changes.
   */
  function onEditorStateChange(_editorState: EditorState) {
    setEditorState(_editorState)

    return onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())))
  }

  return (
    <Root
      className={clsx('w-full overflow-hidden rounded-4 border-1', className)}
      ref={ref}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </Root>
  )
}

const WYSIWYGEditor = React.forwardRef(WYSIWYGEditorComponent)

export default WYSIWYGEditor
