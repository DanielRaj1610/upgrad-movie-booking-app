import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Tabs.css'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className='tabs_container'>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



const CenterTabs = (props) => {
    const { tabs } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                color='secondary'
                variant="fullWidth"
                centered
                aria-label="tabs"
            >
                {tabs.map((item, index) => (
                    <Tab key={`${item}-${index}`} label={item.tabName} {...a11yProps(index)} />
                ))}
            </Tabs>
            <div
                index={value}
            >
                {tabs.map((item, index) => (
                    <TabPanel key={`${item}-${index}1`} value={value} index={index} >
                        {item.tabContent}
                    </TabPanel>
                ))}
            </div>
        </div>
    );
}
CenterTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        tabName: PropTypes.string,
        tabContent: PropTypes.node
    })).isRequired
}
export default CenterTabs;