FROM cirrusci/flutter:3.3.3

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN flutter pub upgrade

RUN flutter pub get

CMD ["flutter", "build", "apk"]
