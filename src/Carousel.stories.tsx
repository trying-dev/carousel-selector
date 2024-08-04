import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import CarouselSelector from "."
import { CarouselSelectorProps } from "."

export default {
  title: "Carousel",
  component: CarouselSelector,
} as Meta

const Template: StoryFn<CarouselSelectorProps> = (args: any) => (
  <CarouselSelector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  initialOption: 1,
  onChange: (item: any) => console.log(item),
}
