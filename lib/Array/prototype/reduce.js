/*=pod

=head2 reduce( Function fun, Any initialValue? ) Returns Any

Apply fun() against two values of the array (from left-to-right) as to reduce it to a single value and return that value.

=cut*/

Array.prototype.reduce = function(fun /*, initial*/)
{
	var len = this.length;
	if (typeof fun != "function") {
		throw new TypeError();
	}

	// no value to return if no initial value and an empty array
	if (len == 0 && arguments.length == 1) {
		throw new TypeError();
	}

	var i = 0;
	if (arguments.length >= 2) {
		var rv = arguments[1];
	} else {
		do {
			if (i in this) {
				rv = this[i++];
				break;
			}

			// if array contains no values, no initial value to return
			if (++i >= len) {
				throw new TypeError();
			}
		} while (true);
	}

	for (; i < len; i++) {
		if (i in this) {
			rv = fun.call(null, rv, this[i], i, this);
		}
	}

	return rv;
};
