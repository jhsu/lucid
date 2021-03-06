import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	omitProps,
	FC,
	StandardProps,
	FixDefaults,
} from '../../util/component-types';

const cx = lucidClassNames.bind('&-Badge');

const { node, string, oneOf } = PropTypes;

export enum Kind {
	default = 'default',
	primary = 'primary',
	success = 'success',
	danger = 'danger',
	warning = 'warning',
	info = 'info',
	dark = 'dark',
}

export enum Type {
	filled = 'filled',
	stroke = 'stroke',
}

export interface IBadgeProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLSpanElement>,
			HTMLSpanElement
		> {
	kind?: keyof typeof Kind;
	/** Fill variations for the `Badge` */
	type?: keyof typeof Type;
}

const defaultProps = {
	kind: Kind.default,
	type: Type.filled,
};

export const Badge: FC<IBadgeProps> = (props): React.ReactElement => {
	const {
		className,
		kind,
		type,
		children,
		...passThroughs
	} = props as FixDefaults<IBadgeProps, typeof defaultProps>;

	return (
		<span
			className={cx('&', `&-${kind}`, `&-${type}`, className)}
			{...omitProps(passThroughs, undefined, _.keys(Badge.propTypes))}
		>
			{children}
		</span>
	);
};

Badge.defaultProps = defaultProps;
Badge.displayName = 'Badge';
Badge.peek = {
	description: `
				\`Badge\` is a quick utility component to create a badge around any
				element(s).
			`,
	categories: ['visual design', 'icons'],
};
Badge.propTypes = {
	className: string`
			class names that are appended to the defaults
		`,

	children: node`
			any valid React children
		`,

	kind: oneOf(_.values(Kind))`
			Style variations for the \`Badge\`
		`,

	type: oneOf(_.values(Type))`
			Fill style variations for the \`Badge\`
		`,
};

export default Badge;
