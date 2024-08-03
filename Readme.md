# Carousel

A simple and customizable carousel component for React.

[Storybook](https://carousel-selector-storybook.netlify.app/?path=/story/carousel--default)

## Installation

You can install the package via npm:

```bash
npm install carousel-selector
```

Make sure you have `react` and `react-dom` installed as peer dependencies:

```bash
npm install react react-dom
```

## Usage

Here's a basic example of how to use the `Carousel` component in your project:

```tsx
import React, { useState } from "react"
import { Carousel } from "carousel-selector"

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleChange = (itemAtFront) => {
    setSelectedItem(itemAtFront)
  }

  return (
    <div>
      <h1>My Carousel Example</h1>
      <Carousel
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        onChange={handleChange}
        initialOption={1}
      />
      <p>Selected Item: {selectedItem}</p>
    </div>
  )
}

export default App
```

## Props

### `Carousel`

| Prop            | Type       | Description                                                | Default                       |
| --------------- | ---------- | ---------------------------------------------------------- | ----------------------------- |
| `options`       | `any[]`    | Array of items to display in the carousel.                 | `[1, 2, 3, 4, 5, 6, 7, 8, 9]` |
| `onChange`      | `function` | Callback function called when the front item changes.      | `null`                        |
| `initialOption` | `any`      | The initial item to be shown at the front of the carousel. | `null`                        |

## Development

To set up the development environment:

1. Clone the repository:

```bash
git clone https://github.com/your-username/my-carousel.git
cd my-carousel
```

2. Install the dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Contributing

If you have suggestions for how this project can be improved, or want to report a bug, open an issue! We'd love all and any contributions. If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
