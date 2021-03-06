import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	FC,
	StandardProps,
	findTypes,
	omitProps,
	FixDefaults,
} from '../../util/component-types';
import RadioButton, {
	IRadioButtonProps,
	defaultProps as radioButtonDefaultProps,
} from '../RadioButton/RadioButton';

const cx = lucidClassNames.bind('&-RadioButtonLabeled');
const { any, object, string } = PropTypes;

interface IRadioButtonLabeledLabelProps extends StandardProps {
	description?: string;
}
const RadioButtonLabeledLabel: FC<IRadioButtonLabeledLabelProps> = (): null =>
	null;
RadioButtonLabeledLabel.displayName = 'RadioButtonLabeled.Label';
RadioButtonLabeledLabel.peek = {
	description: `
		Used to identify the purpose of this radio button to the user -- can
		be any renderable content.
	`,
};
RadioButtonLabeledLabel.propName = 'Label';

export interface IRadioButtonLabeledProps extends IRadioButtonProps {
	/** Child element whose children are used to identify the purpose of this
		radio button to the user. */
	Label?: string | React.ReactNode & { props: IRadioButtonLabeledLabelProps };
}

export interface IRadioButtonLabeledFC extends FC<IRadioButtonLabeledProps> {
	Label: FC<IRadioButtonLabeledLabelProps>;
}

export const RadioButtonLabeled: IRadioButtonLabeledFC = (
	props
): React.ReactElement => {
	const {
		className,
		isDisabled,
		isSelected,
		onSelect,
		style,
		...passThroughs
	} = props as FixDefaults<IRadioButtonProps, typeof radioButtonDefaultProps>;

	const labelChildProps = _.first(
		_.map(findTypes(props, RadioButtonLabeled.Label), 'props')
	);

	return (
		<label
			className={cx(
				'&',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
				},
				className
			)}
			style={style}
		>
			<RadioButton
				className={className}
				isDisabled={isDisabled}
				isSelected={isSelected}
				onSelect={onSelect}
				{...omitProps(
					passThroughs,
					undefined,
					_.keys(RadioButtonLabeled.propTypes),
					false
				)}
			/>
			<div {...labelChildProps} className={cx('&-label')} />
		</label>
	);
};

RadioButtonLabeled.displayName = 'RadioButtonLabeled';

RadioButtonLabeled.defaultProps = radioButtonDefaultProps;

RadioButtonLabeled.peek = {
	description: `
		This is a composite of the \`RadioButton\` component and the native
		\`label\` element.
	`,
	categories: ['controls', 'toggles'],
	extend: 'RadioButton',
	madeFrom: ['RadioButton'],
};

RadioButtonLabeled.propTypes = {
	...RadioButton.propTypes,

	className: string`
		Appended to the component-specific class names set on the root element.
	`,

	style: object`
		Passed through to the root element.
	`,

	Label: any`
		Child element whose children are used to identify the purpose of this
		radio button to the user.
	`,
};

RadioButtonLabeled.Label = RadioButtonLabeledLabel;

export default RadioButtonLabeled;
