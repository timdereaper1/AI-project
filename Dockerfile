FROM heroku/miniconda

# Grab requirements.txt
ADD requirements.txt /tmp/requirements.txt

# Install dependencies
RUN pip install -qr /tmp/requirements.txt

# Add code
ADD . /opt/webapp
WORKDIR /opt/webapp

RUN conda install pyenchant

CMD gunicorn --bind 0.0.0.0:$PORT wsgi