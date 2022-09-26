import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { IconCardImages, IconCardTextSizes } from '../models/icon-card.model';

import { IconCardComponent } from './icon-card.component';

export default {
  title: 'Public-Client/Shared/IconCardComponent',
  args: {
    config: {
      iconCardImage: IconCardImages.AT_SIGN,
      textLines: [
        {
          uiLabel: 'Test Line 1',
          size: IconCardTextSizes.SMALL
        },
        {
          uiLabel: 'Test Line 2',
          size: IconCardTextSizes.LARGE
        }
      ],
    },
    iconCardImage: IconCardImages.CLOCK,

  },
  decorators: [
    moduleMetadata({
      declarations: [IconCardComponent],
      imports: [CommonModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(story => `<div style="height: 300px; width: 400px; padding: 2rem; background: red">${story}</div>`),
  ],
  component: IconCardComponent,
} as Meta;

const Template: Story<IconCardComponent> = (args: IconCardComponent) => ({
  props: args,
});

export const TopLineLarge = Template.bind({});
TopLineLarge.args = {
  iconCardImage: IconCardImages.MAP_MARKER,
  config: {
    iconCardImage: IconCardImages.MAP_MARKER,
    textLines: [
      {
        uiLabel: 'Test Line 1',
        size: IconCardTextSizes.LARGE
      },
      {
        uiLabel: 'Test Line 2',
        size: IconCardTextSizes.SMALL
      }
    ]
  }
};

export const BottomLineLarge = Template.bind({});
BottomLineLarge.args = {
};
