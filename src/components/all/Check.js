import * as React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Error } from './Error';

export function Check(props) {
    const { label, value, setValue, } = props;
    const { t } = useTranslation();

 
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
  <>
    <div className='card_input_container'>
    <p className='card_input_label'>{t(label)}</p>
    <Checkbox.Group
    onChange={onChange}
    value={value}
  >
    <Row>
      <Col span={4}>
        <Checkbox value="INAS">Багцлалт</Checkbox>
      </Col>
      <Col span={4}>
        <Checkbox value="INAJ">Тохируулга</Checkbox>
      </Col>
      <Col span={4}>
        <Checkbox value="INII">Зарлага</Checkbox>
      </Col>
      <Col span={4}>
        <Checkbox value="INPI">Тооллого</Checkbox>
      </Col>
      <Col span={4}>
        <Checkbox value="PSCM">Буцаалтын орлого</Checkbox>
      </Col>
      <Col span={4}>
        <Checkbox value="PSIN"> Буцаалтын зарлага </Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>

    {value?.error ? <Error label={label} error={value?.error} fromForm={true} /> : null}
  </div>
    </>
  );
};
