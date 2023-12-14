#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/chat/src
COPY pom.xml /home/chat
RUN mvn -f /home/chat/pom.xml clean package

#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build /home/chat/target/getyourway-0.0.1-SNAPSHOT.jar /usr/local/lib/chat.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/chat.jar"]