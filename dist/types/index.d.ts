import React from "react";
export interface CarouselSelectorProps {
    options: any[];
    onChange: (itemAtFront: any) => any;
    initialOption: any;
}
declare const CarouselSelector: ({ options, onChange, initialOption, }: CarouselSelectorProps) => React.JSX.Element;
export default CarouselSelector;
