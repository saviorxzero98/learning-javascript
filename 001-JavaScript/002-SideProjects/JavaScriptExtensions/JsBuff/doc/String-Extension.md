# String擴充


## ● String.format

#### String.format(textValue, arguments..)


```javascript
// Return "Hello Workd!"
String.format("Hello {0}{1}", "World", "!");    

// Return "3 3.14, -10"
String.format("{0} {1} {2}", 3, 3.14, -10);
```

## ● String.sprintf

#### String.sprintf(textValue, arguments..)

```javascript
// Return "' 55' '55 ' '055' '3.14' '3.140000' '3.14e+0'"
String.sprintf("'%3d' '%-3d' '%03d' '%2.2f' '%2.6f' '%2.2e'", 55, 55, 55, 3.1415, 3.14, 3.1415);

// Return "%% 'A' 'AA' '   AA' '%s'"
String.sprintf("%% '%c' '%s' '%5s' '%s'", "AA", "AA", "AA");

// Return "'7f' '1111111' '15' '255'"
String.sprintf("'%x' '%#2x' '%#2d' '%#16d'", 127, 127, "1111", "FF");

// Return "'177' '585' '63'"
String.sprintf("'%#8x' '%#8d' '%#8d'", 127, "1111", "77");
```

## ● String.empty

#### String.empty()

```javascript
// Return ""
String.empty();
```

## ● String.isEmpty

#### String.isEmpty()

```javascript
var emptyString = "";
var noEmptyString = "string";

// Return true
emptyString.isEmpty();

// Return false
noEmptyString.isEmpty();
```

## ● String.equals

#### String.equals(string)

```javascript
var string1 = "string";
var string2 = "string";
var string3 = "String";

// Return true
string1.equals(string2);

// Return false
string1.equals(string3);
```


## ● String.equalsIgnoreCase

#### String.equalsIgnoreCase(string)

```javascript
var string1 = "string";
var string2 = "string";
var string3 = "String";
var string4 = "text";

// Return true
string1.equalsIgnoreCase(string2);

// Return true
string1.equalsIgnoreCase(string3);

// Return false
string1.equalsIgnoreCase(string4);
```

