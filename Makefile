# Run linters on the source code
lint: jslint csslint

# Run jslint on all JavaScript code
jslint:
	jslint *.js --terse --browser --white --indent=2 --plusplus --sloppy --nomen --vars --predef $$ --predef Tools --predef display --predef switchMode --predef maximum --predef minimum

# Run csslint on all CSS code
csslint:
	csslint *.css --quiet

# Deploy the app by merging master into gh-pages and pushing
deploy:
	git checkout gh-pages
	git merge master
	git push
	git checkout master
	git push
