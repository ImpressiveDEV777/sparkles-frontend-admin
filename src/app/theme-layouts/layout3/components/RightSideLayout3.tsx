import { lazy, memo } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));

/**
 * The right side layout 3.
 */
function RightSideLayout3() {
	return <QuickPanel />;
}

export default memo(RightSideLayout3);
