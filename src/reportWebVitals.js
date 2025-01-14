const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
      getFCP(onPerfEntry);
      getFID(onPerfEntry);
    });
  }
};

export default reportWebVitals;
