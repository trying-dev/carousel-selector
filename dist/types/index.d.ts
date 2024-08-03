import React from "react";
export interface CarouselProps {
    options: any[];
    onChange: (itemAtFront: any) => any;
    initialOption: any;
}
declare const Carousel: ({ options, onChange, initialOption, }: CarouselProps) => React.JSX.Element;
export default Carousel;
