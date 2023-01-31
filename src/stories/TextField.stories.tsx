import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField } from '../components/TextField';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '200px', marginTop: '1rem' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'First Name',
  placeholder: 'Enter your name',
  defaultValue: 'Maya',
  onSave: () => {
    console.log('Saved!');

    return Promise.resolve()
  },
};

