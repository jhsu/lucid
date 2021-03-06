import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { partitionText } from '../../util/text-manipulation';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, FC, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Underline');

const { node, string, instanceOf, oneOfType } = PropTypes;

const matchAllRegexp = /^.*$/;

export interface IUnderlineProps 
	extends StandardProps, 
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	/** The first match of the given pattern has the underline style applied to it. */
	match?: string | RegExp;
}

export const Underline: FC<IUnderlineProps> = ({
	className,
	children,
	match,
	...passThroughs
}): React.ReactElement => {
	if (!_.isRegExp(match)) {
		if (_.isString(match)) {
			match = new RegExp(_.escapeRegExp(match), 'i');
		} else {
			match = matchAllRegexp;
		}
	}

	if (!_.isString(children)) {
		return (
			<span
				className={cx('&', className)}
				{...omitProps(passThroughs, undefined, _.keys(Underline.propTypes))}
			>
				<span
					style={
						match === matchAllRegexp
							? { textDecoration: 'underline' }
							: undefined
					}
				>
					{children}
				</span>
			</span>
		);
	}

	const [pre, matchText, post] = partitionText(children, match);

	return (
		<span
			className={cx('&', className)}
			{...omitProps(passThroughs, undefined, _.keys(Underline.propTypes))}
		>
			{[
				pre && <span key='pre'>{pre}</span>,
				matchText && (
					<span key='match' style={{ textDecoration: 'underline' }}>
						{matchText}
					</span>
				),
				post && <span key='post'>{post}</span>,
			]}
		</span>
	);
};

Underline.displayName = 'Underline';
Underline.peek = {
	description: `
		Underlines a portion of text that matches a given pattern
	`,
	categories: ['controls', 'selectors'],
};
Underline.propTypes = {
	className: string`
		Appended to the component-specific class names set on the root element.
	`,
	children: node`
		Text to be partially or fully underlined. If non-text is passed as
		children, it will not attempt to match the given pattern.
	`,
	match: oneOfType([string, instanceOf(RegExp)])`
		The first match of the given pattern has the underline style applied to it.
	`,
};

export default Underline;
