function erroHandler(err, req, res, next) {
    console.error(err.message);
    res.status(400).send({ message: err.message });
}

export default erroHandler