# Dictionary (Map) 擴充

## Constructor 
```javascript
var dictionary = new Dictionary();  
```

## ● Dictionary.add

#### Dictionary.add(key, value)

```javascript
// {}
var dictionary = new Dictionary();  

// { first: "First Data" }
dictionary.add("first", "First Data");
```

## ● Dictionary.addMore

#### Dictionary.addMore(keyValuePair[])

```javascript
// {}
var dictionary = new Dictionary();  

// { first: "First Data", second: "Second Value" }
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);
```

## ● Dictionary.addDictionary

#### Dictionary.addDictionary(Dictionary)

```javascript
// { first: "First Data" }
var dictionary = new Dictionary();
dictionary.add("first", "First Data");

// { second: "Second Value" }
var dictionary2 = new Dictionary();  
dictionary2.add("second", "Second Value");

// { first: "First Data", second: "Second Value" }
dictionary.addDictionary(dictionary2);
```

## ● Dictionary.get

#### Dictionary.get(key)

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// return Second Value
var value = dictionary.get("second");
```

## ● Dictionary.remove

#### Dictionary.remove(key)

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// { first: "First Data" }
dictionary.remove("second");
```


## ● Dictionary.removeAll

#### Dictionary.removeAll()

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// { }
dictionary.removeAll();
```

## ● Dictionary.isContainsKey

#### Dictionary.isContainsKey(key)

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// return false
var isContainsKey1 = dictionary.isContainsKey("third");

// return true
var isContainsKey2 = dictionary.isContainsKey("first");
```

## ● Dictionary.isContainsValue

#### Dictionary.isContainsValue(value)

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// return false
var isContainsValue1 = dictionary.isContainsValue("Third Value");

// return true
var isContainsValue2 = dictionary.isContainsValue("First Data");
```

## ● Dictionary.keys

#### Dictionary.keys()

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// return ["first", "second"]
var keys = dictionary.keys();
```

## ● Dictionary.values

#### Dictionary.values()

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// return ["First Data", "Second Value"]
var values = dictionary.values();
```

## ● Dictionary.toJson

#### Dictionary.toJson()

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

// return '{ "first": "First Data", "second": "Second Value" }'
var jsonString = dictionary.toJson();
```

## ● Dictionary.addFromJson

#### Dictionary.addFromJson(JsonString)

```javascript
// { third: "Third Data" }
var dictionary = new Dictionary();  
dictionary.add("third", "Third Data");

//  { third: "Third Data", first: "First Data", second: "Second Value" } 
dictionary.addFromJson('{ "first": "First Data", "second": "Second Value" }');
```

## ● Dictionary.clone

#### Dictionary.clone()

```javascript
// { first: "First Data", second: "Second Value" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}]);

var cloneDictionart = dictionary.clone();
```

## ● Dictionary.sort

#### Dictionary.sort(isDescOrder)

```javascript
// { first: "First Data", second: "Second Value", "a":"AA" }
var dictionary = new Dictionary();  
dictionary.addMore([{key: "first", value: "First Date"}, {key: "second", value: "Second Value"}, {key="a", value="AA"}]);

// Order : { "a":"AA", first: "First Data", second: "Second Value" }
dictionary.sort();
dictionary.sort(false);

// DESC Order : { second: "Second Value", first: "First Data", "a":"AA" }
dictionary.sort(true);
```






