import React, {useState} from 'react';
import {Approval} from 'utils/ApiTypes';
import Button from 'components/Common/Button';
import {Dialog, Checkbox} from '@blueprintjs/core';
import {DatePicker} from '@blueprintjs/datetime';
import {
  DialogHeader,
  DialogBody,
  DialogFooterActions,
} from 'components/Common/Dialog';
import {range} from 'utils/Utils';
import Dropdown from 'components/Common/Dropdown';

interface Props {
  approvals: Approval[];
}

const hours = range(0, 24).map(h => ({
  key: h,
  value: h,
  text: h.toString(),
}));

const minutes = range(0, 4, 15).map(m => ({
  key: m,
  value: m,
  text: m.toString(),
}));

const getFutureDate = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d;
};

const ReleaseApprove = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [defer, setDefer] = useState(false);

  if (props.approvals.length === 0) {
    return null;
  }

  const title =
    props.approvals.length === 1
      ? props.approvals[0].releaseEnvironment.name
      : 'Approve multiple';

  const tooltip =
    props.approvals.length === 1
      ? `Approve release to ${props.approvals[0].releaseEnvironment.name}`
      : 'Select releases to approve';

  return (
    <>
      <Button text={title} tooltip={tooltip} onClick={() => setVisible(true)} />
      <Dialog
        isOpen={visible}
        onClose={() => setVisible(false)}
        className="bp3-dark">
        <DialogHeader content="Approve release" />
        <DialogBody>
          {props.approvals.map(approval => (
            <div key={approval.id}>
              {approval.releaseDefinition.name} to{' '}
              {approval.releaseEnvironment.name}
            </div>
          ))}
          <div>
            <Checkbox
              title="Defer release"
              checked={defer}
              onChange={() => setDefer(!defer)}>
              Defer release
            </Checkbox>
          </div>
          {defer && (
            <div>
              <DatePicker
                locale="sv-se"
                dayPickerProps={{firstDayOfWeek: 1}}
                minDate={new Date()}
                maxDate={getFutureDate()}
              />
              <Dropdown<number>
                loading={false}
                value={0}
                items={hours}
                onChange={() => {}}
                noData=""
              />
              <Dropdown<number>
                loading={false}
                value={0}
                items={minutes}
                onChange={() => {}}
                noData=""
              />
            </div>
          )}
        </DialogBody>
        <DialogFooterActions>
          <Button text="Cancel" onClick={() => setVisible(false)} />
          <Button intent="primary" text="Approve" />
        </DialogFooterActions>
      </Dialog>
    </>
  );
};

export default ReleaseApprove;
