# Run linters on the source code
lint: jslint csslint

# Run jslint on all JavaScript code
jslint:
	jslint *.js --terse --indent=2 --plusplus --nomen --vars --predef $$ --predef _ --predef View --predef Helpers --predef Tools

# Run csslint on all CSS code
csslint:
	csslint *.css --quiet

doc:
	docco *.js
