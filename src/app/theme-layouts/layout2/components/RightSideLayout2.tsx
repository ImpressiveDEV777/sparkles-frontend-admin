import { lazy, memo } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));

/**
 * The right side layout 2.
 */
function RightSideLayout2() {
	return <QuickPanel />;
}

export default memo(RightSideLayout2);
