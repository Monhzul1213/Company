import * as React from 'react';
import { Checkbox, Row, Col, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { Error } from './Error';
import Password from 'antd/lib/input/Password';
export function Check(props) {
    const { label, value, setValue, handleEnter, disabled, id, vLabel } = props;
    const { t } = useTranslation();

//   const onChange = e => setValue({ value: e?.target?.value, error: null });
 
  const onChange = (e) => {
    console.log( e.target.value);
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

    {/* <Checkbox.Group>
     <Row>
        <Col>
     <Checkbox className='card_input1' 
      disabled={disabled}
      value={1}
      onChange={onChange}
      >True</Checkbox>
      </Col>
      <Col>
      <Checkbox className='card_input1' 
      disabled={disabled}
      value={2}
      onChange={onChange}
      >False</Checkbox></Col>
      </Row> </Checkbox.Group> */}
    {value?.error ? <Error label={label} error={value?.error} fromForm={true} /> : null}
  </div>
    </>
  );
};
