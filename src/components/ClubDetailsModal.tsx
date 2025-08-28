import React from "react";
import { Modal, Timeline, Typography } from "antd";

const { Text } = Typography;

interface ClubDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: any;
}

const ClubDetailsModal: React.FC<ClubDetailsModalProps> = ({ isOpen, onClose, club }) => {
  if (!club) return null;

  return (
    <Modal
      title={`${club.name} `}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={650}
    >
      <Timeline mode="left" className="mt-30">
        <Timeline.Item color="blue">
          <Text strong>President:</Text> {club.club_president}
        </Timeline.Item>
        <Timeline.Item color="green">
          <Text strong>Vice President:</Text> {club.club_vice}
        </Timeline.Item>
        <Timeline.Item color="red">
          <Text strong>Region:</Text> {club.region?.name}
        </Timeline.Item>
        <Timeline.Item color="purple">
          <Text strong>Category:</Text> {club.club?.category}
        </Timeline.Item>
        <Timeline.Item>
          <Text strong>Members:</Text> {club.members}
        </Timeline.Item>
        <Timeline.Item>
          <Text strong>Events:</Text> {club.events}
        </Timeline.Item>
        <Timeline.Item>
          <Text strong>Notices:</Text> {club.notices}
        </Timeline.Item>
      </Timeline>
    </Modal>
  );
};

export default ClubDetailsModal;
