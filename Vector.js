//Class Vector begin
//類別宣告
function Vector(inc)
{	
	if(inc == 0)
	{
		inc = 100;
	}
	
	//屬性宣告，定義
	this.data = new Array(inc);
	this.increment = inc;
	this.size = 0;
	
	//方法宣告
	this.getCapacity = Vector_getCapacity;
	this.getSize = Vector_getSize;
	this.isEmpty = Vector_isEmpty;
	this.getLastElement = Vector_getLastElement;
	this.getFirstElement = Vector_getFirstElement;
	this.getElementAt = Vector_getElementAt;
	this.addElement = Vector_addElement;
	this.insertElementAt = Vector_insertElementAt;
	this.removeElementAt = Vector_removeElementAt;
	this.removeAllElements = Vector_removeAllElements;
	this.indexOf = Vector_indexOf;
	this.contains = Vector_contains;
	this.resize = Vector_resize;
	this.toString = Vector_toString;
	this.sort = Vector_sort;
	this.trimToSize = Vector_trimToSize;
	this.clone = Vector_clone;
	this.overwriteElementAt = Vector_overwriteElementAt;
}

// Vector_getCapacity() -- returns the number of elements the vector can hold
function Vector_getCapacity()
{
	return this.data.length;
}

// Vector_getSize() -- returns the current size of the vector
function Vector_getSize()
{
	return this.size;
}

// Vector_isEmpty() -- checks to see if the Vector has any elements
function Vector_isEmpty()
{
	return this.getSize() == 0;
}

// Vector_getLastElement() -- returns the last element
function Vector_getLastElement()
{
	if (this.data[this.getSize() - 1] != null)
	{
		return this.data[this.getSize() - 1];
	}
}

// Vector_getFirstElement() -- returns the first element
function Vector_getFirstElement()
{
	if (this.data[0] != null)
	{
		return this.data[0];
	}
}

// Vector_getElementAt() -- returns an element at a specified index
function Vector_getElementAt(i)
{
	try
	{
		return this.data[i];
	} 
	catch (e)
	{
		return "Exception " + e + " occured when accessing " + i;	
	}	
}

// Vector_addElement() -- adds a element at the end of the Vector
function Vector_addElement(obj)
{
	if(this.getSize() == this.data.length) 
	{
		this.resize();
	}
	this.data[this.size++] = obj;
}

// Vector_insertElementAt() -- inserts an element at a given position
function Vector_insertElementAt(obj, index)
{
	try
	{
		if (this.size == this.capacity)
		{
			this.resize();
		}
		
		for (var i=this.getSize(); i > index; i--)
		{
			this.data[i] = this.data[i-1];
		}
		this.data[index] = obj;
		this.size++;
	}
	catch (e)
	{
		return "Invalid index " + i;
	}
}

// Vector_removeElementAt() -- removes an element at a specific index
function Vector_removeElementAt(index)
{
	try
	{
		var element = this.data[index];
		
		for(var i=index; i<(this.getSize()-1); i++)
		{
			this.data[i] = this.data[i+1];
		}
		
		this.data[this.getSize()-1] = null;
		this.size--;
		return element;
	}
	catch(e)
	{
		return "Invalid index " + index;
	}
} 

// Vector_removeAllElements() -- removes all elements in the Vector
function Vector_removeAllElements()
{
	this.size = 0;
	
	for (var i=0; i<this.data.length; i++)
	{
		this.data[i] = null;
	}
}

// Vector_indexOf() -- returns the index of a searched element
function Vector_indexOf(obj)
{
	for (var i=0; i<this.getSize(); i++)
	{
		if (this.data[i] == obj)
		{
			return i;
		}
	}
	return -1;
}

// Vector_contains() -- returns true if the element is in the Vector, otherwise false
function Vector_contains(obj)
{
	for (var i=0; i<this.getSize(); i++)
	{
		if (this.data[i] == obj)
		{
			return true;
		}
	}
	return false;
}

// Vector_resize() -- increases the size of the Vector
function Vector_resize()
{
	newData = new Array(this.data.length + this.increment);
	
	for	(var i=0; i< this.data.length; i++)
	{
		newData[i] = this.data[i];
	}
	
	this.data = newData;
}


// Vector_trimToSize() -- trims the vector down to it's size
function Vector_trimToSize()
{
	var temp = new Array(this.getSize());
	
	for (var i = 0; i < this.getSize(); i++)
	{
		temp[i] = this.data[i];
	}
	this.size = temp.length - 1;
	this.data = temp;
} 

// Vector_sort() - sorts the collection based on a field name - f
function Vector_sort(f)
{
	var i, j;
	var currentValue;
	var currentObj;
	var compareObj;
	var compareValue;
	
	for(i=1; i<this.getSize();i++)
	{
		currentObj = this.data[i];
		currentValue = currentObj[f];
		
		j= i-1;
		compareObj = this.data[j];
		compareValue = compareObj[f];
		
		while(j >=0 && compareValue > currentValue)
		{
			this.data[j+1] = this.data[j];
			j--;
			if (j >=0)
			{
				compareObj = this.data[j];
				compareValue = compareObj[f];
			}				
		}	
		this.data[j+1] = currentObj;
	}
}

// Vector_clone() -- copies the contents of a Vector to another Vector returning the new Vector.
function Vector_clone()
{
	var newVector = new Vector(this.size);
	
	for (var i=0; i<this.size; i++)
	{
		newVector.addElement(this.data[i]);
	}
	
	return newVector;
}

// Vector_toString() -- returns a string rep. of the Vector
function Vector_toString()
{
	var str = "Vector Object properties:\n" +
	          "Increment: " + this.increment + "\n" +
	          "Size: " + this.size + "\n" +
	          "Elements:\n";
	
	for (var i=0; i<this.getSize(); i++)
	{
		for (var prop in this.data[i])
		{
			var obj = this.data[i];
			str += "\tObject." + prop + " = " + obj[prop] + "\n";
		}
	}
	return str;	
}

// Vector_overwriteElementAt() - overwrites the element with an object at the specific index.
function Vector_overwriteElementAt(obj, index)
{
	this.data[index] = obj;
}
//Class Vector end
