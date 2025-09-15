import React, { useState } from 'react';
import { StyledTabs } from '../../StylesComponents';
import { Box, Tab } from '@mui/material';
import { TabPanelProps, TabsComponentProps } from '../../../types/share';

export const TabsComponent = ({ propsChild, propTabsTitle }: TabsComponentProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        style={{ width: '100%' }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
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
      <StyledTabs
        sx={{
          width: '100%',
          '& .MuiTabs-list': {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          },
        }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {propTabsTitle.map((title, index) => (
          <Tab label={title} {...a11yProps(index)} key={index} />
        ))}
      </StyledTabs>
      {propsChild.map((item, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {item}
        </CustomTabPanel>
      ))}
    </>
  );
};
