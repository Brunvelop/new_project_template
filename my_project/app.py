from refract import Refract

app = Refract(
    "my-project",
    discover=["my_project.core"],
    views={
        "/": "my_project/web/views/index.html",
        "/about": "my_project/web/views/about.html",
    },
    static_dirs=[("/static", "my_project/web")],
)

# Expose the FastAPI app for uvicorn (advanced use)
# fastapi_app = app.api()

# Custom CLI commands — add your own below:
# @app.command()
# def my_command():
#     """Does something custom."""
#     pass
