import { memo, lazy } from 'react';

const QuickPanel = lazy(() => import('app/theme-layouts/shared-components/quickPanel/QuickPanel'));

/**
 * The right side layout 1.
 */
function RightSideLayout1() {
	return <QuickPanel />;
}

export default memo(RightSideLayout1);
