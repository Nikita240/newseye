# Newseye

### Installation

```
pip3 install -U Flask
pip3 install --target ./package newsapi-python gensim
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
