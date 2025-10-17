import React, { useState } from 'react';
// mui
import { Box } from '@mui/material';
// styles
import { StyledTab, StyledTabs } from '../../StylesComponents';
// types
import { ITabPanelProps, ITabsComponentProps } from '../../../types/share';

export const TabsComponent = ({ propsChild, propTabsTitle }: ITabsComponentProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CustomTabPanel = (props: ITabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <Box
        style={{ width: '100%' }}
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </Box>
    );
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  return (
    <>
      <StyledTabs value={value} onChange={handleChange} aria-label="tabs">
        {propTabsTitle.map((title, index) => (
          <StyledTab label={title} {...a11yProps(index)} key={index} />
        ))}
      </StyledTabs>
      {propsChild.map((item, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {typeof item === 'function' ? item() : item}
        </CustomTabPanel>
      ))}
    </>
  );
};
