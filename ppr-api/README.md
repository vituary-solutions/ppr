# PPR API

The PPR API is a RESTful application that manages data interaction for the Personal Property Registry.


## Development Setup

Open the ppr-api directory in VS Code to treat it as a project. To prevent version clashes, set up a virtual environment
to install the Python packages used by this project.

1. To activate the *Python* plugin, open any *.py* file. You will get error notifications about missing linters, test
suites, and interpreters - these can be ignored.
1. Run `python3 -m venv .venv` to create the virtual environment in the directory *.venv*. You should get a notification
allowing you to choose it as your enviroment.
1. Start a new terminal window to activate the `(.venv)` environment (or run `source .venv/bin/activate` in an existing
terminal).
1. In that terminal do `pip install -r requirements/dev.txt` to install the required packages.
1. Next run `pip install .` to set up the environment for running tests.

You also need to set up the variables used for environment-specific settings:
1. Copy the [dotenv template file](../docs/dotenv_template) to somewhere above the source code and rename to `.env`. You
will need to fill in missing values.


## Running the PPR Database on localhost

You can use Docker Compose to run a PostgreSQL database locally. It requires a `DB_PASSWORD` environment variable which
can be in your `.env` file.  However, this will require you `.env` file to be in the root project directory.

To prepare your local database, from the command line:
1. Start `venv` in the `ppr-api` folder: `source .venv/bin/activate`
1. In the root project folder: `./reset_database.sh`

The script above will:
- Run `docker-compose down` to bring down your database if it is running
- Delete the database volume used by your docker-compose instance, if it exists
- Run `docker-compose up -d` to bring up your database
- Run alembic to create the application database schema
- Execute a SQL script to create a small amount of test data for developer use

## Running PPR-API

1. Start the uvicorn server with `(cd src && uvicorn main:app --reload)`
1. View the [OpenAPI Docs](http://127.0.0.1:8000/docs).


## Debugging PPR-API

1. ???


## Running Unit Tests

Tests are run from the Status bar at the bottom of the workbench. This will also run the coverage report, which appears
in the *htmlcov* directory.


## Debugging Unit Tests

1. ???


## Running Integration Tests

Integration tests rely on a connection to the database and will use the same environment settings as the PPR API. With
the database running, execute the following in your `venv` environment:
1. `pytest tests/integration`


## Application Configuration

### OpenShift Configuration

Note that if the pods are not starting, and producing errors like:

> [CRITICAL] WORKER TIMEOUT (pid:10)

it can be that there isn't enough CPU to start the uvicorn processes within gunicorn's 30 second timeout. Try giving the
pods a little more CPU.

### Uvicorn/Gunicon Configuration

These settings configure the [Uvicorn/Gunicon](https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker) web server.
Although the server is tuned down to 4 processes to lighten the resource usage, with three pods it still has a dozen
worker processes running.

| Environment Variable | Description             |
| -------------------- | ----------------------- |
| PORT                 | Port to listen on: 8080 |
| WEB_CONCURRENCY      | Number of processes: 4  |

### CORS Configuration

| Environment Variable    | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| PPR_API_ALLOWED_ORIGINS | Allowed origins for CORS. Provide a space separated list of URLs. |

### PostgreSQL Database Configuration

These settings are for building connections to the database.

| Environment Variable | Description                        |
| -------------------- | ---------------------------------- |
| PPR_API_DB_HOSTNAME  | Host where the database is located |
| PPR_API_DB_PORT      | Port to listen on: 5432            |
| PPR_API_DB_NAME      | The name of the database           |
| PPR_API_DB_USERNAME  | The username to connect with       |
| PPR_API_DB_PASSWORD  | The password of the user           |

### Sentry Configuration

These settings configure [Sentry](https://sentry.io) for error monitoring.

| Environment Variable | Description                    |
| -------------------- | ------------------------------ |
| SENTRY_DSN           | Sentry key for the PPR project |
| SENTRY_ENVIRONMENT   | Environment: Dev/Test/Prod     |

### Jaeger Configuration

# TODO - Update for Python

See the [Jaeger Client Config Documentation]
(https://github.com/jaegertracing/jaeger-client-java/blob/v1.0.0/jaeger-core/README.md#configuration-via-environment)
for detailed instructions on how to configure instrumentation. If not specified, defaults will be used.

By default the `JAEGER_SAMPLER_PARAM` is set to `0.001`, so you are unlikely to see spans reported locally unless you
override this value.

The [docker-compose.yml](../docker-compose.yml) in the project root directory can be used to run Jaeger on your local
system. The Jaeger Java client will use the instance running on `localhost` by default.
