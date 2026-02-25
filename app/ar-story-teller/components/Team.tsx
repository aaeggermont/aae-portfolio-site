'use client';
import './Team.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
    name: string;
    role: string;
}

interface TeamProps {
    title: string;
    members?: TeamMember[];
    [key: string]: unknown;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function MemberRow({ left, right }: { left: TeamMember; right?: TeamMember }) {
    return (
        <div className="row_team">
            <div className="column-content">
                <div className="member-name-left">{left.name}</div>
                <div className="member-title-left">{left.role}</div>
            </div>
            <div className="column-content">
                {right && (
                    <>
                        <div className="member-name-right">{right.name}</div>
                        <div className="member-title-right">{right.role}</div>
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Team({ title, members = [], ...props }: TeamProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <>
                <div {...props} className="storyteller-team-container-desktop">
                    <div className="team-title">{title}</div>
                    <MemberRow left={members[0]} right={members[1]} />
                    <MemberRow left={members[2]} right={members[3]} />
                    <MemberRow left={members[4]} right={members[5]} />
                    <MemberRow left={members[6]} />
                </div>
            </>
        );
    } else if (screenDevice.isTablet) {
        return (
            <>
                <div {...props} className="storyteller-team-container-mdlg">
                    <div className="team-title">{title}</div>
                    <MemberRow left={members[0]} right={members[1]} />
                    <MemberRow left={members[2]} right={members[3]} />
                    <MemberRow left={members[4]} right={members[5]} />
                    <MemberRow left={members[6]} />
                </div>
            </>
        );
    } else if (screenDevice.isMobile) {
        return (
            <>
                <div {...props} className="storyteller-team-container-mobile">
                    <div className="team-title">{title}</div>
                    <div className="team-content">
                        {members.slice(0, 6).map((member, i) => (
                            <div key={i} className="team-member">
                                <div className="member-name">{member.name}</div>
                                <div className="member-role">{member.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return null;
}

export default Team;
