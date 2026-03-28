from refract import Refract

app = Refract(
    "my-project",
    discover=["my_project.core"],
    views={
        "/": "templates/index.html",
        "/about": "templates/about.html",
    },
    static_dirs=[("/static", "static")],
)

# Expose the FastAPI app for uvicorn (advanced use)
# fastapi_app = app.api()

# Custom CLI commands — add your own below:
# @app.command()
# def my_command():
#     """Does something custom."""
#     pass
