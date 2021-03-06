import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	findTypes,
	omitProps,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import * as reducers from './Tabs.reducers';
import Badge from '../Badge/Badge';

const cx = lucidClassNames.bind('&-Tabs');

const { any, bool, func, node, number, string } = PropTypes;

const Tab = createClass({
	displayName: 'Tabs.Tab',

	statics: {
		peek: {
			description: `
				Content that will be rendered in a tab. Be sure to nest a Title inside
				each Tab or provide it as a prop. Props other than \`isDisabled\`,
				\`isSelected\`, and \`Title\` can be inferred from the parent \`Tabs\`
				component, but directly provided \`props\` will take precedence.
			`,
		},
	},

	propName: 'Tab',

	propTypes: {
		className: string`
			Class names that are appended to the defaults.
		`,

		index: number`
			The index of this \`Tab\` within the list of \`Tabs\`.
		`,

		isDisabled: bool`
			Styles a \`Tab\` as disabled. This is typically used with
			\`isProgressive\` to disable steps that have not been completed and
			should not be selected until the current step has been completed.
		`,

		isLastTab: bool`
			If \`true\`, this \`Tab\` is the last \`Tab\` in the list of \`Tabs\`.
		`,

		isOpen: bool`
			If \`true\` then the active \`Tab\` will appear open on the bottom.
		`,

		isProgressive: bool`
			If \`true\`, the \`Tab\` will appear as a \`Progressive\` tab.
		`,

		isSelected: bool`
			If \`true\`, the \`Tab\` will appear selected.
		`,

		onSelect: func`
			Callback for when the user clicks a \`Tab\`. Called with the index of the
			\`Tab\` that was clicked.
		`,

		Title: node`
			The content to be rendered as the \`Title\` of the \`Tab\`.
		`,

		count: number`
			Optional prop that will show a count number next to the tab's title.
		`,

		isVariableCountWidth: bool`
			Defaults to false.
			Allows the count bubble to grow large. Useful if working with huge numbers.
		`,
	},

	handleClick(event) {
		const {
			props,
			props: { index, onSelect, ...passThroughs },
		} = this;

		if (!props.isDisabled) {
			onSelect(index, passThroughs, event);
		}
	},

	render() {
		const {
			isDisabled,
			isLastTab,
			isOpen,
			isProgressive,
			isSelected,
			Title,
			className,
			count,
			isVariableCountWidth,
			...passThroughs
		} = this.props;

		return (
			<li
				className={cx(
					'&-Tab',
					{
						'&-Tab-is-active': isSelected,
						'&-Tab-is-disabled': isDisabled,
						'&-Tab-is-active-and-open': isOpen && isSelected,
						'&-Tab-is-progressive': isProgressive && !isLastTab,
					},
					className
				)}
				onClick={this.handleClick}
				{...omitProps(passThroughs, Tab)}
			>
				<span className={cx('&-Tab-content')}>
					{Title}
					{!_.isNil(count) && (
						<Badge
							style={{
								marginLeft: '12px',
								width: isVariableCountWidth ? null : '20px',
								minWidth: '20px',
							}}
							type='stroke'
							kind={isSelected ? 'primary' : null}
						>
							{count}
						</Badge>
					)}
				</span>
				{isProgressive && !isLastTab && (
					<span className={cx('&-Tab-arrow')}>
						<svg
							className={cx('&-Tab-arrow-svg')}
							viewBox={'0 0 8 37'}
							preserveAspectRatio='none'
						>
							<polyline
								className={cx('&-Tab-arrow-tab-line')}
								fill='#fff'
								points='0,0 1,1 0,1'
							/>
							<polyline
								className={cx('&-Tab-arrow-line')}
								fill='none'
								stroke='#fff'
								strokeWidth='1'
								points={'0,37 7.3,18.5 0,0'}
							/>
						</svg>
					</span>
				)}
			</li>
		);
	},
});

const Tabs = createClass({
	displayName: 'Tabs',

	statics: {
		peek: {
			description: `
				\`Tabs\` provides tabbed navigation. It has a flexible interface that
				allows tab content to be passed as regular React children or through
				props.
			`,
			categories: ['navigation'],
		},
	},

	components: {
		Tab,
		Title: createClass({
			statics: {
				peek: {
					description: `
						Titles can be provided as a child or prop to a Tab.
					`,
				},
			},
			displayName: 'Tabs.Title',
			propName: 'Title',
		}),
	},

	reducers,

	propTypes: {
		className: string`
			Class names that are appended to the defaults.
		`,

		selectedIndex: number`
			Indicates which of the \`Tabs.Tab\` children is currently selected. The
			index of the last \`Tabs.Tab\` child with \`isSelected\` equal to
			\`true\` takes precedence over this prop.
		`,

		onSelect: func`
			Callback for when the user clicks a tab. Called with the index of the tab
			that was clicked.
		`,

		isOpen: bool`
			If \`true\` then the active tab will appear open on the bottom.
		`,

		isProgressive: bool`
			Style the tabs as a progression. This is typically used for a work flow
			where the user needs to move forward and backward through a series of
			steps.
		`,

		isFloating: bool`
			Provides a small bottom border that offers a barrier between the tab
			group and the rest of the page.
			Useful if the tabs are not anchored to anything.
		`,

		hasMultilineTitle: bool`
			Set the multiline className. This is typically used for styling the
			Tab.Title bar for improved readability when there are multiple React
			elements in the tab headers.
		`,

		hasFullWidthTabs: bool`
			If \`true\` the width will be evenly distributed to all tabs.  \`False\`
			typically used in conjunction with \`Tab.width\`
		`,

		Tab: any`
			*Child Element* Can be used to define one or more individual \`Tab\`s in
			the sequence of \`Tabs\`.
		`,
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onSelect: _.noop,
			isOpen: true,
			isProgressive: false,
			isFloating: false,
			hasMultilineTitle: false,
			hasFullWidthTabs: false,
		};
	},

	handleClicked(index, tabProps, event) {
		const { onSelect } = this.props;

		onSelect(index, { event, props: tabProps });
	},

	render() {
		const {
			className,
			hasMultilineTitle,
			isOpen,
			isProgressive,
			selectedIndex,
			hasFullWidthTabs,
			isFloating,
			...passThroughs
		} = this.props;

		// Grab props array from each Tab
		const tabChildProps = _.map(findTypes(this.props, Tab), 'props');

		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true,
		});

		const actualSelectedIndex =
			selectedIndexFromChildren !== -1
				? selectedIndexFromChildren
				: selectedIndex;

		return (
			<div {...omitProps(passThroughs, Tabs)} className={cx('&', className)}>
				<ul
					className={cx('&-bar', {
						'&-bar-is-multiline': hasMultilineTitle,
						'&-variable-width': !hasFullWidthTabs,
						'&-floating': isFloating,
					})}
				>
					{_.map(tabChildProps, (tabProps, index) => (
						<Tab
							key={index}
							index={index}
							isLastTab={index === tabChildProps.length - 1}
							isOpen={isOpen}
							isProgressive={isProgressive}
							isSelected={index === actualSelectedIndex}
							onSelect={this.handleClicked}
							Title={_.get(
								getFirst(tabProps, Tabs.Title),
								'props.children',
								''
							)}
							{...tabProps}
						/>
					))}
				</ul>
				<div className={cx('&-content')}>
					{_.get(tabChildProps, [actualSelectedIndex, 'children'])}
				</div>
			</div>
		);
	},
});

export default buildHybridComponent(Tabs);
export { Tabs as TabsDumb };
