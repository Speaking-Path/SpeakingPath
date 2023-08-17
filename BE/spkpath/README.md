# How to Build
## 1. Make your own application files
1. mkdir src/main/resources   
2. make & fill application.properties & application.yml
    > you can check examples at [here](../../exec/말하길%20프로젝트%20매뉴얼.pdf)

## 2. Database setting
We use 2 Databases
1. MariaDB
   1. Download MariaDB 
   2. Run [SQL](resources/schema.sql)
   3. or Run [dump](../../exec/dump.sql)
2. Redis
   1. Download redis

## 3. Build Gradle
1. If you want to get jar file to execute, Gradle > build > bootJar 
2Then you can get your jar file at build/lib/*.jar

## 4. Run
1. If you use IntelliJ, you can just run 'SpkpathApplication'
2. If you run on terminal, use this line
    ```
   java -jar {your jar file name}.jar
   ```