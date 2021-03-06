import React from 'react';
import createClass from 'create-react-class';
import { Selection, Resizer } from '../../../index';

export default createClass({
	render() {
		return (
			<Resizer>
				{width => {
					const responsiveMode = width >= 400 ? 'large' : 'small';

					return (
						<div>
							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									isRemovable={false}
									responsiveMode={responsiveMode}
									kind='container'
									Label='Container Light Not Removable'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind='container'
									Label='Container Light'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									isFilled
									isRemovable={false}
									responsiveMode={responsiveMode}
									kind='container'
									Label='Container Filled Not Removable'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									isFilled
									responsiveMode={responsiveMode}
									kind='container'
									Label='Container Filled'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									Label='Default'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind='success'
									Label='Success'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind='danger'
									Label='Danger'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind='info'
									Label='Info'
								/>
							</div>

							<div style={{ margin: '10px' }}>
								<Selection
									isSmall
									responsiveMode={responsiveMode}
									kind='warning'
									Label='Warning'
								/>
							</div>
						</div>
					);
				}}
			</Resizer>
		);
	},
});
