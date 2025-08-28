import type { FC } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { useWaitlist } from '@/hooks/useAdmin';

interface WaitlistItem {
	id: number;
	user_id: string;
	user: string;
	club_id: string;
	club: string;
	status: string;
	created_at: string;
}

const Waitlist: FC = () => {
	const { data } = useWaitlist();

	const columns: ColumnsType<WaitlistItem> = [
		{ title: 'S/N', key: 'sn', render: (_v, _r, i) => i + 1 },
		{ title: 'Student', dataIndex: 'user', key: 'user' },
		{ title: 'Club', dataIndex: 'club', key: 'club' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{ title: 'Requested On', dataIndex: 'created_at', key: 'created_at' },
	];

	const customEmpty = (
		<div className="flex flex-col items-center justify-center py-8">
			<SearchOutlined style={{ fontSize: '48px', color: '#3b82f6' }} />
			<div className="text-center mt-4">
				<div className="text-lg font-medium text-gray-900 mb-2">No Waitlist entries yet</div>
				<div className="text-gray-600">Waitlist requests will appear here</div>
			</div>
		</div>
	);

	return (
		<div className="">
			<div className="p-4 border bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
				<h3 className="text-md font-semibold text-[#667085]">Waitlist</h3>
			</div>
			<div className="border-[0.6px] bg-[#FFFFFF] rounded-lg mb-3 border-[#EAEAEA]">
				<Table
					columns={columns}
					dataSource={data}
					rowKey={(r) => r.id}
					locale={{ emptyText: customEmpty }}
					size="small"
					className="custom-table text-[14px]"
					pagination={{ pageSize: 8, showSizeChanger: false, showQuickJumper: false }}
				/>
			</div>
		</div>
	);
};

export default Waitlist;