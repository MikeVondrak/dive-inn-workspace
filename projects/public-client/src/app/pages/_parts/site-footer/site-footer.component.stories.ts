import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { SiteFooterComponent } from './site-footer.component';

export default {
  title: 'Public-Client/Site-Footer',
  args: {
    address: 'Test Address',
    phone: '123-456-7890',
  },
  decorators: [
    moduleMetadata({
      declarations: [SiteFooterComponent],
      imports: [CommonModule, BrowserAnimationsModule],
    }),
  ],
  component: SiteFooterComponent,
} as Meta;

const Template: Story<SiteFooterComponent> = (args: SiteFooterComponent) => ({
  props: args,
});

export const DefaultState = Template.bind({});
// DefaultState.args = {
// };
