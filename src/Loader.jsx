const Loader = (loading) => {
    return loading.loading ? <div className="loader"></div> : null;
};

export default Loader