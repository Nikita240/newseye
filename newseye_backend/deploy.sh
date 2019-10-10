aws lambda update-function-code --function-name get-sources --zip-file fileb://lambda.zip
aws lambda update-function-code --function-name get-news --zip-file fileb://lambda.zip
aws lambda update-function-code --function-name get-news-from-source --zip-file fileb://lambda.zip
aws lambda update-function-code --function-name get-search --zip-file fileb://lambda.zip
# aws lambda update-function-code --function-name cache-test --zip-file fileb://lambda.zip