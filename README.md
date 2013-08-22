<h1>HeapBox - jQuery &lt;selectbox&gt; (not only) replacement</h1>
HeapBox is plugin for jQuery that replace native HTML selectboxes in your webpages. HeapBox supports themes, events, callbacks, ajax and much more. See more at <a href="http://www.bartos.me/heapbox" title="HeapBox">www.bartos.me/heapbox</a>.

<h2>Quick install</h2>

Include the jquery and heapbox in your head:

<pre>
&lt;script src="js/jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="js/heapbox.js" type="text/javascript"&gt;&lt;/script&gt;
</pre>

Include one chosen heapbox theme style:

<pre>
&lt;link rel="stylesheet" href="themes/dark/css/dark.css" type="text/css" media="screen" /&gt;
</pre>

Create selectbox:

<pre>
&lt;select id="mySelect"&gt;
    &lt;option value="value1"&gt;Value 1&lt;/option&gt;
    &lt;option value="value2"&gt;Value 2&lt;/option&gt;
&lt;/select&gt;
</pre>

Init heapbox:

<pre>
$("#mySelect").heapbox();
</pre>


<h2>Using</h2>

Basic heapbox without any configuration.

<pre>
$("#mySelect1").heapbox();
</pre>

See more examples at <a href="http://www.bartos.me/heapbox" title="HeapBox">www.bartos.me/heapbox</a>.

<h2>About</h2>

Heapbox is created by <a href="http://www.bartos.me" title="Filip Bartos">Filip Bartos</a> and is licensed under <a href="http://www.bartos.me/heapbox/LICENSE" title="MIT LICENSE">MIT</a>.
