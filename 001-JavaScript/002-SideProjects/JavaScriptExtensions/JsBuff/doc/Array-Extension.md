# Array擴充


## ● Array.empty

#### Array.empty()

```javascript
// Return []
Array.empty();    
```
## ● Array.isEmpty

#### Array.isEmpty()

```javascript
var emptyArray = [];
var noEmptyArray = [1, 2, 3];

// Return true
emptyArray.isEmpty();    

// Return false
noEmptyArray.isEmpty();
```
## ● Array.add

#### Array.add(item)

```javascript
// Array Items : []
var emptyArray = [];

// Array Items : [1]
emptyArray.add(1);

// Array Items : [1, 2]
emptyArray.add(2);
```

## ● Array.addRange

#### Array.addRange(array)

```javascript
// Array Items : []
var emptyArray = [];

// Array Items : [1, 2]
emptyArray.addRange([1, 2]);

// Array Items : [1, 2, 3, 4, 5]
emptyArray.addRange([3, 4, 5]);
```

## ● Array.insert

#### Array.insert(index, item)

```javascript
// Array Items : ["A", "B", "C"]
var sampleArray = ["A", "B", "C"];

// Array Items : ["A", "D", "B", "C"]
sampleArray.insert(1, "D");
```

## ● Array.insertRange

#### Array.insertRange(index, array)

```javascript
// Array Items : ["A", "B", "C"]
var sampleArray = ["A", "B", "C"];

// Array Items : ["A", "D", "E", "F", "B", "C"]
sampleArray.insertRange(1, ["D", "E", "F"]);
```

## ● Array.replace

#### Array.replace(index, item)

```javascript
// Array Items : ["A", "B", "C"]
var sampleArray = ["A", "B", "C"];

// Array Items : ["A", "D", "C"]
sampleArray.replace(1, "D");
```

## ● Array.replaceRange

#### Array.replaceRange(index, item)

```javascript
// Array Items : ["A", "B", "C"]
var sampleArray = ["A", "B", "C"];

// Array Items : ["A", "D", "E"]
sampleArray.replaceRange(1, ["D", "E"]);

// Array Items : ["A", "D", "F", "G"]
sampleArray.replaceRange(2, ["F", "G"]);
```

## ● Array.remove

#### Array.remove(index)

```javascript
// Array Items : ["A", "B", "C"]
var sampleArray = ["A", "B", "C"];

// Array Items : ["A", "C"]
sampleArray.remove(1);
```

## ● Array.removeRanage

#### Array.removeRange(index, length)

```javascript
// Array Items : ["A", "B", "C", "D", "E"]
var sampleArray = ["A", "B", "C", "D", "E"];

// Array Items : ["A", "B", "E"]
sampleArray.removeRanage(2, 2);
```

## ● Array.reverseSort

#### Array.reverseSort(callback)

```javascript
// Array Items : ["A", "D", "Z", "C", "E"]
var sampleArray = ["A", "D", "Z", "C", "E"];

// Array Items : ["Z", "E", "D", "C", "A"]
sampleArray.reverseSort();
```

## ● Array.clear

#### Array.clear()

```javascript
// Array Items : ["A", "D", "Z", "C", "E"]
var sampleArray = ["A", "D", "Z", "C", "E"];

// Array Items : []
sampleArray.clear();
```

## ● Array.indexesOf

#### Array.indexesOf()

```javascript
var sampleArray = ["A", "C", "Z", "C", "E"];

// Return [1, 3]
sampleArray.indexesOf("C");

// Return [1, 3]
sampleArray.indexesOf("C", 1);

// Return [3]
sampleArray.indexesOf("C", 2);
```

