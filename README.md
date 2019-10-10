# Newseye

### Installation

```
pip3 install -U Flask
pip3 install --target ./package news-please newsapi-python elasticache-auto-discovery pymemcache
```

### Run test server

```
cd newseye_backend
./run.sh
```

### Build zip file for deployment

```
cd newseye_backend
./build.sh
```

### Deploy to AWS Lambda

You will to have installed the AWS CLI and to run `aws config`. Follow the instructions [here](https://aws.amazon.com/cli/).

```
cd newseye_backend
./deploy.sh
```
