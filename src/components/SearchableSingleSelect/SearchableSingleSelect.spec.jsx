import * as _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import { SearchableSingleSelectDumb as SearchableSingleSelect } from './SearchableSingleSelect';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';

const { Option } = SearchableSingleSelect;

describe('SearchableSingleSelect', () => {
	common(SearchableSingleSelect, {
		exemptFunctionProps: ['optionFilter'],
	});

	describe('render', () => {
		it('should render selections', () => {
			const wrapper = shallow(
				<SearchableSingleSelect>
					<Option>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</SearchableSingleSelect>
			);

			expect(wrapper.find(DropMenu).length).toBe(1);
		});

		it('should pass `isDisabled` to `Options`', () => {
			const wrapper = shallow(
				<SearchableSingleSelect>
					<Option isDisabled>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</SearchableSingleSelect>
			);
			const [first, second, third] = wrapper
				.find(DropMenu.Option)
				.map(option => option.prop('isDisabled'));
			expect(first).toBe(true);
			expect(second).toBe(false);
			expect(third).toBe(false);
		});
	});

	describe('props', () => {
		describe('onSearch', () => {
			it('should work', () => {
				const onSearch = jest.fn();
				const wrapper = shallow(
					<SearchableSingleSelect onSearch={onSearch}>
						<Option callbackId={'zero'}>Zero</Option>
						<Option callbackId={'one'}>One</Option>
					</SearchableSingleSelect>
				);
				const expected = {
					event: 'fake',
					props: {
						callbackId: 'zero',
						children: 'Zero',
					},
				};

				wrapper.find('SearchField').prop('onChange')('ero', { event: 'fake' });

				expect(onSearch).toHaveBeenCalledWith('ero', 0, expected);
			});
		});

		describe('onSelect', () => {
			it('should work when fired from the DropMenu', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: {
						preventDefault: _.noop,
					},
					props: {},
				};

				const wrapper = shallow(
					<SearchableSingleSelect onSelect={onSelect}>
						<Option>option a</Option>
					</SearchableSingleSelect>
				);

				wrapper
					.find('DropMenu')
					.first()
					.prop('onSelect')(10, mockSelectionCallback);

				expect(onSelect).toHaveBeenCalledWith(10, mockSelectionCallback);
			});

			it('should work when selecting filtered options', () => {
				const onSelect = jest.fn();
				const mockSelectionCallback = {
					event: { stopPropagation: _.noop, preventDefault: _.noop },
					props: {},
				};

				const wrapper = shallow(
					<SearchableSingleSelect onSelect={onSelect}>
						<Option isHidden>option a</Option>
						<Option>option b</Option>
					</SearchableSingleSelect>
				);

				wrapper
					.find('DropMenu')
					.first()
					.prop('onSelect')(0, mockSelectionCallback);

				expect(onSelect).toHaveBeenCalledWith(0, mockSelectionCallback);
			});

			it('should work when fired from the selection removal ', () => {
				const onSelect = jest.fn();

				const wrapper = shallow(
					<SearchableSingleSelect
						onSelect={onSelect}
						onSearch={_.noop}
						selectedIndex={0}
					>
						<Option>option a</Option>
					</SearchableSingleSelect>
				);

				wrapper
					.find('Selection')
					.first()
					.prop('onRemove')();

				expect(onSelect).toHaveBeenCalledWith(null);
			});
		});
	});

	describe('custom formatting', () => {
		it('should render Option child function by passing in {searchText}, setting filterText on each option and using a custom optionFilter', () => {
			const optionFilter = (searchText, { filterText }) => {
				if (filterText) {
					return new RegExp(_.escapeRegExp(searchText), 'i').test(filterText);
				}
				return true;
			};

			expect(
				shallow(
					<SearchableSingleSelect optionFilter={optionFilter} searchText='tion'>
						<Option name='OptionA' Selected='option a' filterText='option a'>
							{({ searchText }) => (
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>{searchText}</div>
									<div>option a</div>
								</div>
							)}
						</Option>
						<Option name='OptionB' Selected='option b' filterText='option b'>
							{({ searchText }) => (
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>{searchText}</div>
									<div>option b</div>
								</div>
							)}
						</Option>
						<Option name='OptionC' Selected='option c' filterText='option c'>
							{({ searchText }) => (
								<div style={{ display: 'flex' }}>
									<div style={{ width: 100 }}>{searchText}</div>
									<div>option c</div>
								</div>
							)}
						</Option>
					</SearchableSingleSelect>
				)
			).toMatchSnapshot();
		});
	});
});
