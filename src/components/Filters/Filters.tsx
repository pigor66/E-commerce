import { Col, Input, Row, Select } from 'antd';
import { ProductSelected } from '../../hooks/types';
import { useEffect, useState } from 'react';

type FiltersProps = {
  onFilterChange: (filter: string) => void;
  onSearchChange: (value: string) => void;
  products: ProductSelected[];
  selectedFilter: string;
};

function Filters({ onFilterChange, onSearchChange, products, selectedFilter }: FiltersProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  useEffect(() => {
    setSearchValue('');
    setFilterOptions([]);

    if (selectedFilter === 'date') {
      const dateOptions = products.map((product) => product.date);
      setFilterOptions([...new Set(dateOptions)]);
    } else if (selectedFilter === 'name') {
      const nameOptions = products.map((product) => product.name);
      setFilterOptions([...new Set(nameOptions)]);
    } else if (selectedFilter === 'price') {
      const priceOptions = products.map((product) => product.price.toString());
      setFilterOptions([...new Set(priceOptions)]);
    }
  }, [selectedFilter, products]);

  const handleChange = (value: string) => {
    onFilterChange(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Select
          placeholder='Filtrar por'
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'date', label: 'Data' },
            { value: 'name', label: 'Nome' },
            { value: 'price', label: 'Valor' },
          ]}
        />
      </Col>
      <Col>
        <Select
          placeholder='Selecionar'
          onChange={handleSearchChange}
          style={{ minWidth: '15rem', width: '100%' }}
          options={filterOptions.map((value) => ({ value, label: selectedFilter === 'price' ? `R$ ${value}` : value }))}
        />
      </Col>
    </Row>
  );
}

export default Filters;
