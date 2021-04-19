# QuizReactNativeDotNet
Quiz application using React Native & .NET Core

15 Question quiz with answer feedback and results.

-------

Start Backend = `dotnet run --project Backend/Backend.csproj`
- port 5000
- Requires a MSSQL server
- /api/QuizQuestion/
    - Serves a random question in JSON
        - question: string
        - correctId: int
        - answers: string[]

Start Frontend = `expo start`
- Requires Androit or iOS emulator