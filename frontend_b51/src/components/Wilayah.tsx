import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

interface wilayah {
  id: string;
  name: string;
}

const Wilayah: React.FC = () => {
  const [provinsiData, setProvinsiData] = useState<wilayah[]>([]);
  const [kotaData, setKotaData] = useState<wilayah[]>([]);
  const [kecamatanData, setKecamatanData] = useState<wilayah[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>('');
  const [selectedKota, setSelectedKota] = useState<string>('');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');


    useEffect(() => {
          const fetchData = async () => {
          try {
              const response = await fetch(
              "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
              );
              const data = await response.json();
              setProvinsiData(data);
              console.log('ada provinsi', data);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
          };

          fetchData();
      }, []);

    useEffect(() => {
      const fetchDataKota = async () => {
          try {
              const response = await fetch (
              `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`
              );
              const data = await response.json();
              setKotaData(data)
              console.log('ada kota', data);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      } 
      
      if (selectedProvinsi) {
      fetchDataKota()
      }
    }, [selectedProvinsi]);

    useEffect(() => {
      const fetchDataKecamatan = async () => {
        try {
          const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKota}.json`
          );
          const data = await response.json();
          setKecamatanData(data)
          console.log('ada kecamatan', data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      if (selectedKota) {
        fetchDataKecamatan()
      }
    }, [selectedKota] )


  return (
    <div className="container-fluid my-3 my-md-5">
    <div className="container-fluid my-3 my-md-5" style={{width:850}}>
          <div className='judul'>
            <h2 className='mb-1 text-muted'>API STATIS</h2>
            <h2 className="mt-0 mb-0" style={{color: 'darkcyan'}}>DATA WILAYAH INDONESIA</h2>
          </div>
    <form>
        <Card className='mt-4 shadow'>
            <div className="form-group mb-0 m-3">
            <label htmlFor ="selectProvinsi" >Pilih Provinsi</label>
            <select
                id="selectProvinsi"
                className="mt-1 form-control"
                value={selectedProvinsi}
                onChange={(e) => {
                  setSelectedProvinsi(e.target.value);
                  setSelectedKota(''); 
                  setSelectedKecamatan(''); 
                  }}
            >
                <option value=""></option>
                {provinsiData.map((provinsi) => (
                <option key={provinsi.id} value={provinsi.id}>
                    {provinsi.name}
                </option>
                ))}
            </select>
            </div>
        </Card>

      {selectedProvinsi && (
        <Card className='mt-4 shadow'>
        <div className="form-group mb-0 m-3">
          <label className='mt-2'>Pilih Kab/Kota</label>
          <select
            className="mt-1 form-control"
            value={selectedKota}
            onChange={(e) => {
              setSelectedKota(e.target.value);
              setSelectedKecamatan(''); 
            }}
          >
            <option value=""></option>
            {kotaData.map((kota) => (
              <option key={kota.id} value={kota.id}>
                {kota.name}
              </option>
            ))}
          </select>
        </div>
        </Card>
      )}

      {selectedKota && (
        <Card className='mt-4 shadow'>
        <div className="form-group mb-0 m-3">
          <label>Pilih Kecamatan</label>
          <select
            className="mt-1 form-control"
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
          >
            <option value=""></option>
            {kecamatanData.map((kecamatan) => (
              <option key={kecamatan.id} value={kecamatan.name}>
                {kecamatan.name}
              </option>
            ))}
          </select>
        </div>
        </Card>
      )}

    </form>
    </div>
    </div>
  );
};

export default Wilayah;