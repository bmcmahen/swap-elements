
# swap-elements

  takes a list of dom elements and swaps their classes to display one at a time

## Installation

    $ component install bmcmahen/swap-elements


## Events

* `play` 
* `stop`
* `next`
* `prev`
* `indexChanged` with the index of the current element.


## API

### swap([selector])
With the default template, attributes available include:
```javascript
confirmation('.list-elements').play();
```
### swap#play()

Swaps elements on loop. 

### swap#stop()

Stops swapping elements automatically.

### swap#next()

Shows the next element.

### swap#prev()

Shows the previous element.

### swap#goto([index])

Go to the specified index of an element in the list of elements.

## License

  MIT
