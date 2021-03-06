import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperVerticalIcon');

interface IGripperVerticalIconProps extends IIconProps {}

export const GripperVerticalIcon: FC<IGripperVerticalIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(GripperVerticalIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			width={2}
			height={16}
			viewBox='0 0 2 16'
			className={cx('&', className)}
		>
			<path d='M0 .5h2M0 4h2M0 8h2M0 12h2M0 15.5h2' />
		</Icon>
	);
};

GripperVerticalIcon._isPrivate = true;
GripperVerticalIcon.displayName = 'GripperVerticalIcon';
GripperVerticalIcon.peek = {
	description: `
		A vertical gripper icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GripperVerticalIcon.propTypes = iconPropTypes;

export default GripperVerticalIcon;
