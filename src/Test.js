import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import dump from "./dump.json";

const DropdownDemo = () => {
  const [lazyItems, setLazyItems] = useState([]);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [selectedItem2, setSelectedItem2] = useState(null);

  useEffect(() => {
    setLazyItems(Array.from({ length: dump.data.length }));
    setLazyLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onLazyItemChange = (e) => {
    setSelectedItem2(e.value);
  };

  const onLazyLoad = (event) => {
    if (
      lazyItems[event.first] !== undefined &&
      lazyItems[event.last - 1] !== undefined
    ) {
      return;
    }
    setLazyLoading(true);

    const first = event.first;
    let last = (event.last*2)
    last = last > dump.data.length ? dump.data.length : last;


    getLazyItems(first, last).then((res) => {
      let _lazyItems = [...lazyItems];
      for (let i = first; i < last; i++) {
        _lazyItems[i] = res.data[i - first];
      }
      setLazyItems([..._lazyItems]);
      setLazyLoading(false);
    });
  };

  const getLazyItems = async (first, last) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: dump.data.slice(first, last) });
      }, 1000);
    });
  };

  return (
    <div className="dropdown-demo">
      <div className="card">
        <h5>Virtual Scroll (50 Items) and Lazy</h5>
        <Dropdown
          value={selectedItem2}
          options={lazyItems}
          onChange={onLazyItemChange}
          virtualScrollerOptions={{
            lazy: true,
            onLazyLoad: onLazyLoad,
            itemSize: 38,
            showLoader: true,
            loading: lazyLoading,
            loadingTemplate: (options) => {
              return (
                <div
                  className="flex align-items-center p-2"
                  style={{ height: "38px" }}
                >
                  <Skeleton
                    width={options.even ? "60%" : "50%"}
                    height="1rem"
                  />
                </div>
              );
            },
          }}
          placeholder="Select Item"
        />
      </div>
    </div>
  );
};

export default DropdownDemo;
