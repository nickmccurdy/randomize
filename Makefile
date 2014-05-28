# Run linters on the source code
lint: jshint csslint

# Run jshint on all JavaScript code
jshint:
	jshint js/*.js

# Run csslint on all CSS code
csslint:
	csslint *.css --quiet

doc:
	docco js/*.js
