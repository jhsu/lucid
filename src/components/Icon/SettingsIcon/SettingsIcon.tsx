import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SettingsIcon');

interface ISettingsIconProps extends IIconProps {}

export const SettingsIcon: FC<ISettingsIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(SettingsIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M2.254 13.052l1.733-.999A5.702 5.702 0 0 0 6.5 13.501V15.5h3v-1.999a5.708 5.708 0 0 0 2.513-1.451l1.733.999 1.5-2.599-1.733-.998c.25-.951.25-1.951 0-2.902l1.732-1.001-1.499-2.599-1.733 1A5.707 5.707 0 0 0 9.5 2.502V.5h-3v2.002a5.696 5.696 0 0 0-2.513 1.45l-1.726-1L.76 5.553l1.727.997a5.708 5.708 0 0 0 0 2.902L.755 10.453l1.499 2.599z' />
			<circle cx='8' cy='8' r='2.5' />
		</Icon>
	);
};

SettingsIcon.displayName = 'SettingsIcon';
SettingsIcon.peek = {
	description: `
		A settings icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
SettingsIcon.propTypes = iconPropTypes;

export default SettingsIcon;
